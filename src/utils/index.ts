export const isEmpty = (obj: any) => {
	return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const formatDateToIDLocaleString = (date: string | Date): string => {
	return new Date(date).toLocaleDateString('id-ID', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
};
