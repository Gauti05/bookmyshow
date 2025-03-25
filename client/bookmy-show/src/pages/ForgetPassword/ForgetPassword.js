import {Link} from "react-router-dom";
import {Input, Form , Button, message} from "antd";
import { ForgetPasswordAPI } from "../../calls/Users";



function ForgetPassword(){

    const onSendOTP = async (value)=>{

        console.log(value);

      const response  = await ForgetPasswordAPI({email:value.email});

        if(!response.data.success){
            // message.success(response.data.message);
           
            message.error(response.data.message)

        }else{
          message.success(response.data.message)
          window.location.href="/reset";
        }
    
      }
    
        return <>
        <header className="App-header">
          <main className="main-area mw-500 text-center px-3">
            <section className="left-section">
              <h1>Forget Password </h1>
            </section>
    
            <section className="right-section">
              <Form onFinish={onSendOTP} layout="vertical">
        
              <Form.Item
                  label="Email"
                  htmlFor="email"
                  name="email"
                  className="d-block"
                  rules={[{ required: true, message: "Email is required" }]}
                >
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your Email"
                  >
                  </Input>
    
                </Form.Item>
    
 
    
                <Form.Item className="d-block">
                  <Button
              color="primary"
                 variant="solid"
                    block
                    htmlType="submit"
                    style={{ fontSize: "1rem", fontWeight: "600" }}
                  >
                    Send OTP 
                  </Button>
                </Form.Item>
              </Form>
              <div>
                <p>
                  Existing User? <Link to="/login">Login Here</Link>
                </p>
              </div>
            </section>
          </main>
        </header>
      </>

}


export default ForgetPassword;