const mongoService = require("../../../services/mongo.service");
const COMMUNITIES_COLLECTION = "communities";

/**
 * Retrieves all visible communities a user can access for a given user ID.
 *
 * @async
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of visible communities.
 */
const getVisibleCommunitiesByUserId = async (userId) => {
    const db = await mongoService.connect();
    const communities = db.collection(COMMUNITIES_COLLECTION);
    // an aggregation will find all communities i porentially can have access to
    const visibleCommunities = await communities.aggregate(
        [
            {
                $lookup: {
                    from: 'communities_member_requests',
                    localField: '_id',
                    foreignField: 'communityId',
                    as: 'members'
                }
            },
            {
                $match: {
                    $or: [
                        { 'value.type': 'Public' },
                        {
                            $and: [
                                { 'value.type': 'Private' },
                                { hidden: false }
                            ]
                        },
                        {
                            $and: [
                                { 'value.type': 'Private' },
                                { hidden: true },
                                {
                                    managers: {
                                        $in: [
                                            userId
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            $and: [
                                { 'value.type': 'Private' },
                                { hidden: true },
                                {
                                    'members.userId':
                                    userId
                                }
                            ]
                        }
                    ]
                }
            },
            {
                $graphLookup: {
                    from: 'communities',
                    startWith: '$parentCommunity',
                    connectFromField: 'parentCommunity',
                    connectToField: '_id',
                    as: 'parents',
                    maxDepth: 4,
                    depthField: 'level',
                    restrictSearchWithMatch: {}
                }
            },
            {
                $project: {
                    _id: 1,
                    key: 1,
                    hidden: 1,
                    parentCommunity: 1,
                    ancestors: '$parents._id'
                }
            }
        ],
        { maxTimeMS: 60000, allowDiskUse: true }
    ).toArray();

    // extract their ids
    const allPossibleIds = new Set(visibleCommunities.map(el=>el._id.toString()));

    // now i will check if i have a community that has partn
    // where user dont have explicit access
    const treeVerificated = visibleCommunities.filter((community) => {
        // if ancestors count is 0 its General community
        // if it is one then parent community is general
        if (community.ancestors.length <= 1) {
            return true;
        }

        for(const ancestorId of community.ancestors) {
            const hasAccess = allPossibleIds.has(ancestorId.toString());
            // if found parent that user dont have access to
            // exclude from results
            if(!hasAccess) {
                return false;
            }
        };

        return true;
    })
    return treeVerificated;
}

/**
 * Retrieves all visible communities a user can access feed for a given user ID.
 *
 * @async
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of visible feeds of communities.
 */
const getVisibleFeedCommunitiesByUserId = async (userId) => {
    const db = await mongoService.connect();
    const communities = db.collection(COMMUNITIES_COLLECTION);
    // an aggregation will find all communities i porentially can have access to
    const visibleCommunities = await communities.aggregate(
        [
            {
                $lookup: {
                    from: 'communities_member_requests',
                    localField: '_id',
                    foreignField: 'communityId',
                    as: 'members'
                }
            },
            {
                $match: {
                    $or: [
                        { 'value.type': 'Public' },
                        {
                            $and: [
                                { 'value.type': 'Private' },
                                {
                                    managers: {
                                        $in: [
                                            userId
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            $and: [
                                { 'value.type': 'Private' },
                                {
                                    'members.userId':
                                    userId
                                }
                            ]
                        }
                    ]
                }
            },
            {
                $graphLookup: {
                    from: 'communities',
                    startWith: '$parentCommunity',
                    connectFromField: 'parentCommunity',
                    connectToField: '_id',
                    as: 'parents',
                    maxDepth: 4,
                    depthField: 'level',
                    restrictSearchWithMatch: {}
                }
            },
            {
                $project: {
                    _id: 1,
                    key: 1,
                    hidden: 1,
                    parentCommunity: 1,
                    ancestors: '$parents._id'
                }
            }
        ],
        { maxTimeMS: 60000, allowDiskUse: true }
    ).toArray();

    // extract their ids
    const allPossibleIds = new Set(visibleCommunities.map(el=>el._id.toString()));

    // now i will check if i have a community that has partn
    // where user dont have explicit access
    const treeVerificated = visibleCommunities.filter((community) => {
        // if ancestors count is 0 its General community
        // if it is one then parent community is general
        if (community.ancestors.length <= 1) {
            return true;
        }

        for(const ancestorId of community.ancestors) {
            const hasAccess = allPossibleIds.has(ancestorId.toString());
            // if found parent that user dont have access to
            // exclude from results
            if(!hasAccess) {
                return false;
            }
        };

        return true;
    })
    return treeVerificated;
}

module.exports = {
    getVisibleCommunitiesByUserId,
    getVisibleFeedCommunitiesByUserId
};
