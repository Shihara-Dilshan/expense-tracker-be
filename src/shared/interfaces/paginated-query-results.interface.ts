/**
 * @fileOverview - uses IPaginatedQueryResults interface for type-checking(structural subtyping)
 * when returning paginated query results
 */
export interface IPaginatedQueryResults<T> {
    results: T;
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}
