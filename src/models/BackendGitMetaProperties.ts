export default interface GitMetaPropertiesResponse {
    version: string;
    commitId: string;
    commitIdAbbrev: string;
    buildTime: string;
    branch: string;
    buildHost: string;
    commitTime: string;
    commitMessage: string;
    commitMessageShort: string;
}
