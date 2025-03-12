export interface IRole {
    from: string;
    to: string;
    role: string;
}

export interface IExperience {
    company: string;
    roles: IRole[];
    description: string;
    skills: string[];
}