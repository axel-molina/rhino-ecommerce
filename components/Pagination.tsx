import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useProductsStore from "@/store/useProducts.store";
export const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  const { fetchProducts, totalPages } = useProductsStore();

  const handleChangeProductsPerPage = (e: any) => {
    setProductsPerPage(parseInt(e.target.value));
  };

  const handleLeftPage = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const handleRightPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    fetchProducts(currentPage, productsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, productsPerPage]);

  return (
    <div>
      <p className="text-center mb-5">
        Cantidad por página:
        <select
          name="cantidadPorPagina"
          id="cantidadPorPagina"
          onChange={handleChangeProductsPerPage}
          value={productsPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </p>
      <div className="flex justify-center w-full gap-5">
        <button onClick={handleLeftPage}>
          <ArrowLeft />
        </button>
        <p>
          Página {currentPage} de {totalPages}
        </p>
        <button onClick={handleRightPage}>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};
