import { Button } from "../ui/button";
import { BUTTON_SIZE, BUTTON_VARIANT } from "../ui/button/Button.types";
import { Input } from "../ui/input";
import { credentialsSignInAction } from "./actions";

export const SigninForm = () => {
    return (
      <form className="space-y-4" action={credentialsSignInAction}>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          register={() => {}}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          register={() => {}}
        />
        <Button
          variant={BUTTON_VARIANT.BLACK}
          size={BUTTON_SIZE.LARGE}
          type="submit"
        >
          Sign In
        </Button>
      </form>
    );
}
