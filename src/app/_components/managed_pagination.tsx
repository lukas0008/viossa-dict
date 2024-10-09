import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export const ManagedPagination = (props: { pages: number; page: number }) => {
  const page_url = (page: number) =>
    page == props.page || page > props.pages ? "" : "?page=" + page;
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={page_url(props.page - 1 || 1)} />
        </PaginationItem>
        {props.page > 3 && (
          <PaginationItem>
            <PaginationLink href={page_url(props.page - 2)}>
              {props.page - 2}
            </PaginationLink>
          </PaginationItem>
        )}
        {props.page > 2 && (
          <PaginationItem>
            <PaginationLink href={page_url(props.page - 1)}>
              {props.page - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="">{props.page}</PaginationLink>
        </PaginationItem>
        {props.pages - props.page > 1 && (
          <PaginationItem>
            <PaginationLink href={page_url(props.page + 1)}>
              {props.page + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {props.pages - props.page > 2 && (
          <PaginationItem>
            <PaginationLink href={page_url(props.page + 2)}>
              {props.page + 2}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext href={page_url(props.page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
