import { prisma } from "../../config";
import { CreateGroupParams } from "../../services";

async function getAllGroups() {
 return prisma.group.findMany();
}

async function getGroupById(id: number) {
 return prisma.group.findFirst({
  where: { id },
  include: {
   Meeting: {
    include: {
        MeetingParticipant: true
    }
   },
   BookList: {
    include: {
     Book: {
      include: {
       Author: true,
      },
     },
    },
   },

   GroupMember: {
    include: {
     Role: true,
     User: true,
    },
   },
   GroupLink: true,
  },
 });
}

async function putGroup( id: number ,data: CreateGroupParams){
    return prisma.group.update({
        where: {id},
        data
    })
}

async function createGroup(data: CreateGroupParams){
    return prisma.group.create({
        data
    })
}

async function findByName(name: string){
    return prisma.group.findFirst({
        where: {name}
    })
}

const groupRepository = {
 getAllGroups,
 getGroupById,
 putGroup,
 createGroup,
 findByName
};

export default groupRepository;
