export const breakIntoGroups = (cnt = 2, items = []) => {
    let containers = []
    containers = [...Array(cnt)].map(() => [])
    return items.reduce((groups, item, i) => {
        groups[i % cnt] = [...groups[i % cnt], item]
        return groups
    }, containers)
}