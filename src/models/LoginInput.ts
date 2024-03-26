export type LoginInput = {
    username?: string;
    password?: string;
    isMainUser?: boolean;
};

export type LoginInputWithoutMain = {
    username?: string;
    password?: string;
};
