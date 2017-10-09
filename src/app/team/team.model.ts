export class Team {
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public techStack: string,
        public groupId: string,
        public teamMembers: string[]
    ) { }
}
