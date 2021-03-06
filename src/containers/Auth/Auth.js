import React , {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
// import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state = {
        controls : {
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'E-mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password: {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },
        isSignup:true
    }

    checkValidity(value,rules){
        let isValid = true;
        //or
        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim()!== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length < rules.maxLength && isValid;
        }

        return isValid;
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup};
        });
    }


    inputChangedHandler = (event,controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        };
        this.setState({controls: updatedControls});
    }


    render (){

        const formElementsArray = [];
        
        for (let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArray.map(formElement =>(
            <Input
                key= {formElement.id}
                invalid={!formElement.config.valid}
                elementType={formElement.config.elementType}
                shouldValidate={formElement.config.validation} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                touched={formElement.config.touched}/>
    
        ));

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button
                    clicked= {this.switchAuthModeHandler}
                    btnType='Danger'>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }

}


const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email,password,isSignup) => dispatch (actions.auth(email,password,isSignup))
    };
};

export default connect(null, mapDispatchToProps) (Auth);
