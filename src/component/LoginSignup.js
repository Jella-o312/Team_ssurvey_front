import { Container, Form } from "react-bootstrap"
import React from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import './LoginSignup.css';

const LoginSingup = () => {
  const [selected, setSelected] = React.useState("login");
  
  return (
    <div className="LS">
      <Card className="cardcover">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="로그인">
               <form className="flex flex-col gap-4"> {/* flex-col : 세로 정렬, gap-4: 4픽셀 여백  */}
                <Input isRequired label="Email" placeholder="email을 입력하세요" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="password를 입력하세요"
                  type="password"
                />
                <p className="text-center text-small">
                  회원가입을 하시겠습니까?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    회원가입
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    로그인
                  </Button>
                </div>
              </form>
            </Tab>


            <Tab key="sign-up" title="회원가입">
              <form className="sign">
                <Input isRequired label="Name" placeholder="이름을 입력하세요" type="password" />
                <Input isRequired label="Email" placeholder="email을 입력하세요" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="password를 입력하세요"
                  type="password"
                />
                <p className="text-center text-small">
                  이미 계정이 있습니까?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    로그인
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    가입하기
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default LoginSingup;