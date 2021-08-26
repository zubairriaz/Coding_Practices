import mongoClient from "./mongo-client";

export const mongoApiWrapper = async () => {
	const { mdb } = await mongoClient();
	const mdbFindDocumentByfields = ({
		collectionName,
		fieldName,
		fieldValues,
	}) => {
		return mdb
			.collection(collectionName)
			.find({ [fieldName]: { $in: fieldValues } })
			.toArray();
	};
	return {
		mutators: {},
		loaders: {
			detailLists: async (approachIds) => {
				console.log(approachIds);
				const mongodocs = await mdbFindDocumentByfields({
					collectionName: "approachDetails",
					fieldName: "pgId",
					fieldValues: approachIds,
				});
				console.log(mongodocs);

				let result = approachIds.map((approachId) => {
					const approachDoc = mongodocs.find(
						(doc) => approachId == doc.pgId,
					);
					if (!approachDoc) {
						return [];
					}
					const { explanations, notes, warnings } = approachDoc;
					let approachDetails = [];
					if (explanations) {
						explanations.map((expText) =>
							approachDetails.push({
								content: expText,
								category: "EXPLANATION",
							}),
						);
					}
					if (notes) {
						notes.map((notesText) =>
							approachDetails.push({
								content: notesText,
								category: "NOTE",
							}),
						);
					}
					if (warnings) {
						approachDetails.push(
							...warnings.map((warning) => ({
								content: warning,
								category: "WARNING",
							})),
						);
					}

					return approachDetails;
				});
				console.log(result);
				return result;
			},
		},
	};
};
