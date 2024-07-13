const isDeadlinePassed = (deadline?: string): boolean => {
  if (!deadline) {
    return false;
  }
  return new Date(deadline) < new Date();
};

export { isDeadlinePassed };
