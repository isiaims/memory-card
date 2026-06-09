export const user = {
  details: {
    name: "Person LastName",
    mail: "personmail@mail.com",
    phone: "+234-12345678",
    website: "lastnameperson.com",
    summary: "I just get things done"
  },
  education: [
    {
      id: crypto.randomUUID(),
      schoolName: "TOP College, WorldWideWeb, Internet.",
      course: "Fulstack Web Development",
      from: "2022-01",
      to: "2026-12"
    }
  ],
  experience: [
    {
      id: crypto.randomUUID(),
      companyName: "Self Employed Inc.",
      position: "Junior Front-End Developer",
      description: "Did this and that.",
      from: "2025-01",
      to: "2026-12"
    }
  ]
}
