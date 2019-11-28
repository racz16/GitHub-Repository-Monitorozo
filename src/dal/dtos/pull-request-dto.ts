export interface PullRequestDto {
    url: string;
    id: number;
    node_id: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
    comments_url: string;
    statuses_url: string;
    number: number;
    state: string;
    locked: boolean;
    title: string;
    user: AssigneeDto;
    body: string;
    labels: Array<LabelDto>;
    milestone: MilestoneDto;
    active_lock_reason: string;
    created_at: string;
    updated_at: string;
    closed_at: string;
    merged_at: string;
    merge_commit_sha: string;
    assignee: AssigneeDto;
    assignees: Array<AssigneeDto>;
    requested_reviewers: Array<AssigneeDto>;
    requested_teams: Array<RequestedTeamDto>;
    head: BaseDto;
    base: BaseDto;
    _links: LinksDto;
    author_association: string;
    draft: boolean;
}

export interface LinksDto {
    self: CommentsDto;
    html: CommentsDto;
    issue: CommentsDto;
    comments: CommentsDto;
    review_comments: CommentsDto;
    review_comment: CommentsDto;
    commits: CommentsDto;
    statuses: CommentsDto;
}

export interface CommentsDto {
    href: string;
}

export interface AssigneeDto {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface BaseDto {
    label: string;
    ref: string;
    sha: string;
    user: AssigneeDto;
    repo: RepoDto;
}

export interface RepoDto {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    owner: AssigneeDto;
    private: boolean;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    archive_url: string;
    assignees_url: string;
    blobs_url: string;
    branches_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string;
    deployments_url: string;
    downloads_url: string;
    events_url: string;
    forks_url: string;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    git_url: string;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    languages_url: string;
    merges_url: string;
    milestones_url: string;
    notifications_url: string;
    pulls_url: string;
    releases_url: string;
    ssh_url: string;
    stargazers_url: string;
    statuses_url: string;
    subscribers_url: string;
    subscription_url: string;
    tags_url: string;
    teams_url: string;
    trees_url: string;
    clone_url: string;
    mirror_url: string;
    hooks_url: string;
    svn_url: string;
    homepage: string;
    language: null;
    forks_count: number;
    stargazers_count: number;
    watchers_count: number;
    size: number;
    default_branch: string;
    open_issues_count: number;
    is_template: boolean;
    topics: Array<string>;
    has_issues: boolean;
    has_projects: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_downloads: boolean;
    archived: boolean;
    disabled: boolean;
    pushed_at: string;
    created_at: string;
    updated_at: string;
    permissions: PermissionsDto;
    allow_rebase_merge: boolean;
    template_repository: null;
    allow_squash_merge: boolean;
    allow_merge_commit: boolean;
    subscribers_count: number;
    network_count: number;
}

export interface PermissionsDto {
    admin: boolean;
    push: boolean;
    pull: boolean;
}

export interface LabelDto {
    id: number;
    node_id: string;
    url: string;
    name: string;
    description: string;
    color: string;
    default: boolean;
}

export interface MilestoneDto {
    url: string;
    html_url: string;
    labels_url: string;
    id: number;
    node_id: string;
    number: number;
    state: string;
    title: string;
    description: string;
    creator: AssigneeDto;
    open_issues: number;
    closed_issues: number;
    created_at: string;
    updated_at: string;
    closed_at: string;
    due_on: string;
}

export interface RequestedTeamDto {
    id: number;
    node_id: string;
    url: string;
    html_url: string;
    name: string;
    slug: string;
    description: string;
    privacy: string;
    permission: string;
    members_url: string;
    repositories_url: string;
    parent: null;
}
