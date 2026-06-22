// src/stubs/backup.ts
export const fsAccess = async () => false;
export const backupProject = () => {
  console.warn("Backup disabled in browser");
};
