// @ts-nocheck
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationControlled({ page, count, setPage }) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        defaultPage={1}
        page={page}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        siblingCount={5}
        boundaryCount={2}
      />
    </Stack>
  );
}
