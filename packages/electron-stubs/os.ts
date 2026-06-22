// Browser-safe os stub
export const tmpdir = () => "/tmp";
export const homedir = () => "/tmp";
export const platform = () => "browser";
export const arch = () => "x64";
export const cpus = () => [{ model: "Browser" }];
export const freemem = () => 0;
export const totalmem = () => 0;
export const uptime = () => 0;
export const hostname = () => "localhost";
export const type = () => "Browser";
export const release = () => "1.0";
export const networkInterfaces = () => ({});
export const userInfo = () => ({ username: "browser", homedir: "/tmp" });
export const EOL = "\n";

export default {
    tmpdir, homedir, platform, arch, cpus, freemem, totalmem,
    uptime, hostname, type, release, networkInterfaces, userInfo, EOL,
};
