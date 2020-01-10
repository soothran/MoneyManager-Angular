import { SplitDetail } from './split-detail.model';

export class Split {
    splitId?: number;
    expenseId?: string;
    isGroupExpense?: boolean;
    groupId?: string;
    image?: Blob;
    comment?: string;
    status?: string;
    splitDetails?: SplitDetail[];
    createdOn?: string;
    total?: string;
}
