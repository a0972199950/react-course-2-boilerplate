import authReducer from "../../reducers/auth";


test("should set uid for login", () => {
    const uid = "1111";
    const state = authReducer(undefined, {
        type: "LOGIN",
        uid
    });

    expect(state).toEqual({
        uid
    });
});


test("should clear uid for logout", () => {
    const state = authReducer(undefined, {
        type: "LOGOUT",
    });

    expect(state).toEqual({});
});


test("should do nothing if user neither login nor logout", () => {
    const state = authReducer(undefined, {
        type: "test",
    });

    expect(state).toEqual({});
});