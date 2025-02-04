// import { NextResponse } from 'next/server';
// import { client } from '@/sanity/lib/client';

// // Helper function to handle unknown errors
// function getErrorMessage(error: unknown): string {
//   if (error instanceof Error) {
//     return error.message;
//   }
//   return 'An unknown error occurred';
// }

// export async function GET() {
//   try {
//     const categories = await client.fetch(`*[_type == "category" && _id != categoryId]{
//             _id,
//             name,
//             slug
//           }`);
//           console.log(categories);

//     return NextResponse.json(categories);
//   } catch (error: unknown) {
//     const errorMessage = getErrorMessage(error);
//     return NextResponse.json({ message: errorMessage }, { status: 500 });
//   }
// }

// export async function POST(request: Request) {
//   const { name, slug } = await request.json();
//   try {
//     const newCategory = await client.create({
//       _type: 'category',
//       name,
//       slug,
//     });
//     return NextResponse.json(newCategory);
//   } catch (error: unknown) {
//     const errorMessage = getErrorMessage(error);
//     return NextResponse.json({ message: errorMessage }, { status: 500 });
//   }
// }

// export async function PUT(request: Request) {
//   const { id, name, slug } = await request.json();
//   try {
//     const updatedCategory = await client
//       .patch(id)
//       .set({ name, slug })
//       .commit();
//     return NextResponse.json(updatedCategory);
//   } catch (error: unknown) {
//     const errorMessage = getErrorMessage(error);
//     return NextResponse.json({ message: errorMessage }, { status: 500 });
//   }
// }

// export async function DELETE(request: Request) {
//   const { id } = await request.json();
//   try {
//     await client.delete(id);
//     return NextResponse.json({ message: 'Category Deleted' });
//   } catch (error: unknown) {
//     const errorMessage = getErrorMessage(error);
//     return NextResponse.json({ message: errorMessage }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// Helper function to handle unknown errors
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}


export async function GET() {
  try {
    const categories = await client.fetch(`*[_type == "category"]{
      _id,
      name,
      slug,
      "productCount": count(*[_type == "product" && references(^._id)])
    }`);
    console.log(categories);

    return NextResponse.json(categories);
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { name, slug } = await request.json();
  try {
    const newCategory = await client.create({
      _type: 'category',
      name,
      slug: { _type: 'slug', current: slug }, // Fix for slug issue
      productCount: 0, // Initialize productCount
    });
    return NextResponse.json(newCategory);
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { id, name, slug } = await request.json();
  try {
    const updatedCategory = await client.patch(id).set({ name, slug }).commit();
    return NextResponse.json(updatedCategory);
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  try {
    // Fetch the category before deleting to get the current product count
    const category = await client.getDocument(id);
    if (category && category.productCount > 0) {
      return NextResponse.json({ message: 'Cannot delete category with existing products' }, { status: 400 });
    }

    await client.delete(id);
    return NextResponse.json({ message: 'Category Deleted' });
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
