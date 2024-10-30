import {
  AddCircleOutline,
  Edit,
  HowToReg,
  Person,
  PersonAdd,
} from "@mui/icons-material";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useState } from "react";

const AdminGroupDashboard: React.FC = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: "Group A", leader: "John Doe", members: 8, color: "bg-blue-500" },
    {
      id: 2,
      name: "Group B",
      leader: "Jane Smith",
      members: 6,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Group C",
      leader: "Bob Johnson",
      members: 10,
      color: "bg-yellow-500",
    },
  ]);

  const [newGroupName, setNewGroupName] = useState("");
  const [editingGroup, setEditingGroup] = useState(null);

  const addGroup = () => {
    if (newGroupName.trim() !== "") {
      const colors = [
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-red-500",
        "bg-purple-500",
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setGroups([
        ...groups,
        {
          id: groups.length + 1,
          name: newGroupName,
          leader: "",
          members: 0,
          color: randomColor,
        },
      ]);
      setNewGroupName("");
    }
  };

  const removeGroup = (groupId: number) => {
    setGroups(groups.filter((group) => group.id !== groupId));
  };

  const addMemberToGroup = (groupId: number) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId ? { ...group, members: group.members + 1 } : group,
      ),
    );
  };

  const removeMemberFromGroup = (groupId: number) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId && group.members > 0
          ? { ...group, members: group.members - 1 }
          : group,
      ),
    );
  };

  const setGroupLeader = (groupId: number, leaderName: string) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId ? { ...group, leader: leaderName } : group,
      ),
    );
  };

  const editGroup = (groupId: number) => {};

  const saveGroupEdits = (groupId: number, newName: string) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId ? { ...group, name: newName } : group,
      ),
    );
    setEditingGroup(null);
  };

  return (
    <Card>
      <CardHeader>Club Group Dashboard</CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Groups</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="p-2 border rounded-lg"
                placeholder="New Group Name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
              <button onClick={addGroup}>
                <AddCircleOutline className="h-5 w-5 mr-2" />
                Add Group
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {groups.map((group) => (
              <div
                key={group.id}
                className={`p-4 rounded-lg shadow-sm ${group.color} text-white`}
              >
                <div className="flex items-center justify-between">
                  {editingGroup === group.id ? (
                    <input
                      type="text"
                      className="p-2 border rounded-lg flex-1"
                      defaultValue={group.name}
                      onBlur={(e) => saveGroupEdits(group.id, e.target.value)}
                    />
                  ) : (
                    <h4 className="text-lg font-medium">{group.name}</h4>
                  )}
                  <div className="flex items-center space-x-2">
                    <button onClick={() => editGroup(group.id)}>
                      <Edit className="h-5 w-5" />
                    </button>
                    <button onClick={() => removeGroup(group.id)}>
                      <Person className="h-5 w-5 mr-2" />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <HowToReg className="h-6 w-6" />
                  <span>{group.members} members</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <PersonAdd className="h-6 w-6" />
                  <input
                    type="text"
                    className="p-2 border rounded-lg flex-1"
                    placeholder="Group Leader"
                    defaultValue={group.leader}
                    onBlur={(e) => setGroupLeader(group.id, e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <button onClick={() => addMemberToGroup(group.id)}>
                    <PersonAdd className="h-5 w-5 mr-2" />
                    Add Member
                  </button>
                  <button onClick={() => removeMemberFromGroup(group.id)}>
                    <Person className="h-5 w-5 mr-2" />
                    Remove Member
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminGroupDashboard;
