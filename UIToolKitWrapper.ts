
export class UIToolKitControls {
    //msger-chat
    //chat-container
    urlPatten = "https://fileupload.bupa.com.sa"

    private observer!: MutationObserver;
    constructor(private document: Document, private downloadDocument: any) {

        document.body.addEventListener('click', (event) => {
            //console.log('Dynamic element clicked:', event.target);

            let element = event.target as HTMLElement
            if ((element.classList.contains("mat-icon") && element.textContent?.includes("chat")) || element.classList.contains("mat-mdc-button-touch-target")) {
                this.addAttachmentIcon()
                this.observeChatElement()
                setTimeout(() => {
                    this.checkFileChats()
                }, 300)

            }

        });

    }


    observeChatElement() {

        try {
            let div = this.document.getElementById("chat-container")
            this.observer = new MutationObserver((mutationsList) => {
                this.checkFileChats()
            });

            this.observer.observe(div as HTMLElement, {
                childList: true, // Observe changes to the list of children
                subtree: true    // Also observe child elements
            });

        } catch (error) {

        }


    }

    checkFileChats() {
        try {
            let div = this.document.getElementById("chat-container")
            const anchors = div?.querySelectorAll('a');

            // Log all the anchor tags
            console.log(anchors);

            // Optionally, you can iterate over the NodeList and do something with the anchor tags
            anchors?.forEach(anchor => {
                let text = anchor.textContent
                if (text?.includes(this.urlPatten)) {
                    let array = text.split("/")
                    if (array.length > 0) {
                        anchor.textContent = "View file"
                        console.log(array)

                        anchor.href = '#';
                         let downloadDoc =this.downloadDocument


                        // Add event listener to the anchor to prevent default behavior and call custom function
                        anchor.addEventListener('click', function (event) {
                            event.preventDefault();
                            downloadDoc(array[3])
                        });
                    }



                }


            });


        } catch (error) {

        }



    }







    addAttachmentIcon() {

        try {
            let icon = this.document.getElementsByClassName("attachmentIcon")
            if (icon.length > 0) {

                //Already added
                return
            }

            let column3 = this.document.getElementsByClassName("column3")
            let child = column3[0] as HTMLElement
            let nodes = child.getElementsByClassName("mat-mdc-form-field-flex")
            let div = nodes[0] as HTMLDivElement
            const button = document.createElement('span');
            button.textContent = 'attach_file'
            button.className = "material-icons icon attachmentIcon"
            const rightElement = div.children[1];
            div.insertBefore(button, rightElement)
            button.addEventListener('click', () => {
                const fileInput = document.getElementById('fileInput') as HTMLElement
                fileInput.click();
            });




        } catch (e) {
            this.addAttachmentIcon()
        }
    }

    sendLink(documentID: string, fileName: string, mimeType: String) {
        let column3 = this.document.getElementsByClassName("column3")
        let elements = column3[0] as HTMLElement
        let ls = elements.getElementsByClassName("mdc-floating-label")
        let label = ls[0] as HTMLElement
        label.click()
        let inputArray = elements.getElementsByClassName("mat-mdc-input-element")
        let input = inputArray[0] as HTMLInputElement
        input.value = `${this.urlPatten}/${documentID}/${fileName}/${mimeType}`
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
        let c = document.getElementsByClassName("mat-mdc-form-field-icon-suffix")
        let abc = c[0]
        let sub = abc.children[0] as HTMLElement
        sub.click()

    }



}