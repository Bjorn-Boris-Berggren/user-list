import { defineStore } from 'pinia';
import { faker } from '@faker-js/faker';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [] as Array<{ id: string; name: string; email: string; }>
    }),
    actions: {
        addUser(user: { id: string; name: string; email: string; }) {
            this.users.push(user);
        },
        editUser(id: string, updatedData: { name?: string; email?: string; }) {
            const user = this.users.find(user => user.id === id);
            if (user) {
                user.name = updatedData.name ?? user.name;
                user.email = updatedData.email ?? user.email;
            }
        },
        generateUsers() {
            const newUsers = Array.from({ length: 5 }, () => ({
                id: faker.datatype.uuid(),
                name: faker.name.fullName(),
                email: faker.internet.email()
            }));
            this.users.push(...newUsers);
        }
    }
});