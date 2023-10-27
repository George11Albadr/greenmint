class Login {
    constructor(form,fields){
        this.form = form;
        this.fields = fields;
        this.validateSubmit();
    }

    validateSubmit(){
        let self = this;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            self.fields.forEach(field =>{
                const input = document.querySelector(`#${field}`);
                console.log(input.value);
            })
        })
    }

}

const form = document.querySelector('loginForm');

if(form) {
    const fields = ["email" , "password"];
    const validator = new Login(form, fields);
}
