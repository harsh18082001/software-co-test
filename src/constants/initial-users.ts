interface IUser {
    id?: string;
    user_name?: string;
    email?: string;
    password?: string;
}

interface IInitialState {
    all_users: IUser[],
    current_user: IUser | null,
}

const initial_users: IInitialState = {
    "all_users": [
        {
            "id": "5I2s-925R-yPoV-xzcB",
            "email": "lorem_ipsum1@yopmail.com",
            "user_name": "Lorem Ipsum 1",
            "password": "Lorem1@123"
        },
        {
            "id": "1Vqx-HFNX-g6Ou-vdHx",
            "email": "lorem_ipsum2@yopmail.com",
            "user_name": "Lorem Ipsum 2",
            "password": "Lorem2@123"
        },
        {
            "id": "f4fS-Wfav-X0eq-BieG",
            "email": "lorem_ipsum3@yopmail.com",
            "user_name": "Lorem Ipsum 3",
            "password": "Lorem3@123"
        },
        {
            "id": "QYvS-HVe7-Xzlw-Bs6x",
            "email": "lorem_ipsum4@yopmail.com",
            "user_name": "Lorem Ipsum 4",
            "password": "Lorem4@123"
        },
    ],
    "current_user": null
}

export { initial_users }
export type { IUser, IInitialState }