import { SignInButton } from "@clerk/nextjs";
const Guest = () => {
    return ( <div className="guest">
        <h1>Welcome</h1>
        <p>Please sing in to manage your transactions</p>
        <SignInButton></SignInButton>
    </div> );
}

export default Guest;
