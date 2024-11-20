
export class UIToolKitControls {
       
      

    constructor(private document:Document){

        document.body.addEventListener('click', (event) => {
            //console.log('Dynamic element clicked:', event.target);
      
            let element = event.target as HTMLElement
            if((element.classList.contains("mat-icon") && element.textContent?.includes("chat"))  || element.classList.contains("mat-mdc-button-touch-target"))
              {
                this.addAttachmentIcon()
              }
            
          });
    }

         



    addAttachmentIcon() {

        try {
            let column3 =this.document.getElementsByClassName("column3")
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

    sendLink()
   {
     let column3= this.document.getElementsByClassName("column3")
     let elements = column3[0] as HTMLElement
     let ls=elements.getElementsByClassName("mdc-floating-label")
     let label = ls[0] as HTMLElement
     label.click()
     let inputArray = elements.getElementsByClassName("mat-mdc-input-element")
     let input = inputArray[0] as HTMLInputElement
     input.value = "Document link"
     const event = new Event('input', { bubbles: true });
     input.dispatchEvent(event);
     let c = document.getElementsByClassName("mat-mdc-form-field-icon-suffix")
     let abc=c[0]
     let sub=abc.children[0] as HTMLElement
     sub.click()
     
       
 
   }
}