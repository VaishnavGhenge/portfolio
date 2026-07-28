export interface IRole {
    from: string;
    to: string;
    role: string;
}

export interface IExperience {
    company: string;
    companyUrl?: string;
    roles: IRole[];
    description: React.ReactNode;
    skills: string[];
}
