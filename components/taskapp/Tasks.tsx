"use client";

import React from 'react';
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";


const Tasks = () => {
  const tasks = useQuery(api.tasks.get);

  return (
    <div>
      <h2>Tasks</h2>
      {tasks?.map((task,idx) => (
        <p key={idx}>{JSON.stringify(task)}</p>
      ))}
    </div>
  );
};

export default Tasks;
