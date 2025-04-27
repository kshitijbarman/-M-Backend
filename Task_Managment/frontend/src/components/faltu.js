const fetchUsersWithTasks = async () => {
  try {
    const tasksResponse = await axios.get(`${BASE_URL}/task/getTask`);
    const allTasks = tasksResponse.data.taskData;

    const usersResponse = await axios.get(`${BASE_URL}/user/getUsers`);
    const allUsers = usersResponse.data.userData;

    const usersWithTasks = allUsers
      .filter((user) => {
        const userCreatedTasks = allTasks.some(
          (task) => task.userId && task.userId._id === user._id
        );

        const userAssignedTasks = allTasks.some(
          (task) => task.assignedTo && task.assignedTo._id === user._id
        );

        return userCreatedTasks || userAssignedTasks;
      })
      .map((user) => {
        const taskCount = allTasks.filter(
          (task) =>
            (task.userId && task.userId._id === user._id) ||
            (task.assignedTo && task.assignedTo._id === user._id)
        ).length;

        return { ...user, taskCount };
      });

    setFilteredUsers(usersWithTasks);
  } catch (error) {
    console.log("Error fetching users with tasks", error);
  }
};
