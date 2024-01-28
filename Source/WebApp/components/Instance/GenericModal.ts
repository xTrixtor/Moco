import type { App } from 'vue';
import { createApp, h } from 'vue';
import PrimaryButton from "~/components/Base/PrimaryButton.vue";
import GenericModalInput from "~/components/Base/GenericModal.vue";
import GenericModal from "@/components/Base/GenericModal.vue"
import {GenericEditModalProps} from "@/components/Base/GenericModal.vue"

export class GenericModalInstance{
    private static app:App<Element> | undefined
    private static mountTarget: string | Element = "#editModal"

    public static open(modalProps: any): boolean {
        this.mountTarget = '#editModal'
        if (this.app == undefined) {
            // create new mount
            this.app = createApp({
                setup() {
                    return () => h(GenericModal, modalProps);
                }
            })
            this.app.mount(this.mountTarget);
            return true;
        } else {
            console.log('modal already mounted')
            return false;
        }
    }
    public static close() {
        if (this.app !== undefined) {
            this.app.unmount();
            this.app = undefined
            return true;
        } else {
            console.log('modal already unmounted')
            return false;
        }
    }
    
}


  