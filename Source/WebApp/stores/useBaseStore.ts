import { ref, type Ref } from "vue";
import PocketBase from "pocketbase";
import type { BaseModel } from "~/models/BaseModel";

export const pb = new PocketBase("http://127.0.0.1:8090");

export function useBaseStore<T extends BaseModel>(collectionName: string) {
  const items = ref<T[]>([]) as Ref<T[]>;
  const isLoading = ref(false);

  // Still useful for small collections (like Budgets or FixedCosts)
  const fetchAll = async (filter?: string) => {
    isLoading.value = true;
    try {
      items.value = await pb.collection(collectionName).getFullList<T>({
        filter,
      });
    } catch (error) {
      console.error(
        `Failed to fetch documents for collection: ${collectionName}`,
        error,
      );
    } finally {
      isLoading.value = false;
    }
  };

  // Best practice for scalable collections (like Charges or Incomes)
  const fetchPaginated = async (
    page: number = 1,
    perPage: number = 50,
    filter?: string,
  ) => {
    isLoading.value = true;
    try {
      const result = await pb
        .collection(collectionName)
        .getList<T>(page, perPage, {
          filter,
        });
      items.value = result.items;
      return result;
    } catch (error) {
      console.error(
        `Failed to fetch paginated documents for collection: ${collectionName}`,
        error,
      );
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const getById = async (id: string): Promise<T | undefined> => {
    try {
      return await pb.collection(collectionName).getOne<T>(id);
    } catch (e) {
      return undefined;
    }
  };

  const add = async (item: Partial<T>) => {
    const newItem = await pb.collection(collectionName).create<T>(item);
    items.value.push(newItem);
    return newItem;
  };

  const update = async (id: string, updatedFields: Partial<T>) => {
    const updatedItem = await pb
      .collection(collectionName)
      .update<T>(id, updatedFields);
    const index = items.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      items.value[index] = updatedItem;
    }
    return updatedItem;
  };

  const remove = async (id: string) => {
    await pb.collection(collectionName).delete(id);
    items.value = items.value.filter((item) => item.id !== id);
  };

  return {
    items,
    isLoading,
    fetchAll,
    fetchPaginated,
    getById,
    add,
    update,
    remove,
  };
}
