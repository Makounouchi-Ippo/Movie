import React from 'react'
import classes from './FormUser.css'
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';

const FormUser = () => {
    return (
        <div>
            <div className={classes.blockImage1}>
                    <div className={classes.TitreContainer}>
                        <h2 className={classes.titreInContainer}>Infos Utilisateurs </h2>
                        <div className={classes.Form}>
                            <Form>
                                <Input label="Nom" type="name" floatingLabel={true}  />
                                <Input label="Prenom" type="lastName"  floatingLabel={true} required={true} />
                                <Input label="Login" type="login"  floatingLabel={true} required={true} />
                                <Input label="E-mail" type="email"   floatingLabel={true} required={true} />
                                <Input label="Address" type="address"  floatingLabel={true} required={true} />
                                <div className={classes.button}>
                                  <Button variant="raised" style={{textAlign:'center'}}>Submit</Button>
                                </div> 
                            </Form>
                        </div>     
                    </div>
             </div>
        </div>
    )
}

export default FormUser;