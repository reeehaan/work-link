import Categories from '../../Components/Categories/Categories'
import ProjectList from '../../Components/Projects/ProjectList'


const projects = [
  {
    _id: { $oid: "6762ffa7d9e89e05e1f2c8c7" },
    title: "E-commerce Website",
    skills: ["React", "Node.js", "MongoDB"],
    scope: {
      projectType: "Full website development",
      projectDuration: "3 months",
      experience: "Intermediate",
    },
    budget: { $numberInt: "5000" },
    description:
      "Need to build a full e-commerce website with user authentication, product catalog, and payment integration",
    client: { $oid: "6762ff7cd9e89e05e1f2c8c3" },
    createdAt: { $date: { $numberLong: "1734541223808" } },
    __v: { $numberInt: "0" },
  },

  {
    _id: { $oid: "6762ffa7d9e89e05e1f2c8c7" },
    title: "E-commerce Website",
    skills: ["React", "Node.js", "MongoDB"],
    scope: {
      projectType: "Full website development",
      projectDuration: "3 months",
      experience: "Intermediate",
    },
    budget: { $numberInt: "5000" },
    description:
      "Need to build a full e-commerce website with user authentication, product catalog, and payment integration",
    client: { $oid: "6762ff7cd9e89e05e1f2c8c3" },
    createdAt: { $date: { $numberLong: "1734541223808" } },
    __v: { $numberInt: "0" },
  },

  {
    _id: { $oid: "6762ffa7d9e89e05e1f2c8c7" },
    title: "E-commerce Website",
    skills: ["React", "Node.js", "MongoDB"],
    scope: {
      projectType: "Full website development",
      projectDuration: "3 months",
      experience: "Intermediate",
    },
    budget: { $numberInt: "5000" },
    description:
      "Need to build a full e-commerce website with user authentication, product catalog, and payment integration",
    client: { $oid: "6762ff7cd9e89e05e1f2c8c3" },
    createdAt: { $date: { $numberLong: "1734541223808" } },
    __v: { $numberInt: "0" },
  },

  {
    _id: { $oid: "6762ffa7d9e89e05e1f2c8c7" },
    title: "E-commerce Website",
    skills: ["React", "Node.js", "MongoDB"],
    scope: {
      projectType: "Full website development",
      projectDuration: "3 months",
      experience: "Intermediate",
    },
    budget: { $numberInt: "5000" },
    description:
      "Need to build a full e-commerce website with user authentication, product catalog, and payment integration",
    client: { $oid: "6762ff7cd9e89e05e1f2c8c3" },
    createdAt: { $date: { $numberLong: "1734541223808" } },
    __v: { $numberInt: "0" },
  },
  
];

export default function index() {
  return (
    <div>
        <Categories/>
        <ProjectList projects={projects} />
    </div>
  )
}
