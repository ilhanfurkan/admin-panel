export default function CheckNotEmpty(data: any) {
    switch (typeof data) {
        case 'function':
            return true;
        case 'object':
            return Object.keys(data).length > 0;
        default:
            return !!data;
    }
}
