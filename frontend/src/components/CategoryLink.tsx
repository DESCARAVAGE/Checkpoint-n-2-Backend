import { Category } from "@/types/categories.type";
import Link from 'next/link';
import React from 'react';

type CategoryProps = {
  category: Category
}

function CategoryLink({ category }: CategoryProps) {
  return (
    <>
      <Link href={`/?category=${category.id}`} className="category-navigation-link">{ category.name }</Link>
    </>
  )
}

export default CategoryLink