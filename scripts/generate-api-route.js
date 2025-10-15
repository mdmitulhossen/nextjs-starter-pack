#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const routeName = args[0];

if (!routeName) {
  console.error('❌ Error: Please provide a route name');
  console.log('\n📖 Usage: npm run generate:api-route <route-name>');
  console.log('   Example: npm run generate:api-route users');
  console.log('   Creates: src/app/api/users/route.ts\n');
  process.exit(1);
}

const apiDir = path.join(process.cwd(), 'src', 'app', 'api', routeName);
const routeFile = path.join(apiDir, 'route.ts');

// Create directory if it doesn't exist
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

// Check if file already exists
if (fs.existsSync(routeFile)) {
  console.error(`❌ Error: API route already exists at ${routeFile}`);
  process.exit(1);
}

// Template
const template = `import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema
const ${routeName}Schema = z.object({
  // Add your fields here
  name: z.string().min(1),
})

// GET - Fetch all ${routeName}
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'

    // TODO: Implement database query
    const data = []

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: 0,
      },
    })
  } catch (error) {
    console.error('GET /${routeName} error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create a new ${routeName}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate request body
    const validatedData = ${routeName}Schema.parse(body)

    // TODO: Implement database insert
    const newData = { id: '1', ...validatedData }

    return NextResponse.json(
      {
        success: true,
        data: newData,
        message: '${routeName} created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    console.error('POST /${routeName} error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update ${routeName}
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      )
    }

    // Validate update data
    const validatedData = ${routeName}Schema.partial().parse(updateData)

    // TODO: Implement database update
    const updatedData = { id, ...validatedData }

    return NextResponse.json({
      success: true,
      data: updatedData,
      message: '${routeName} updated successfully',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    console.error('PUT /${routeName} error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete ${routeName}
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      )
    }

    // TODO: Implement database delete

    return NextResponse.json({
      success: true,
      message: '${routeName} deleted successfully',
    })
  } catch (error) {
    console.error('DELETE /${routeName} error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
`;

// Write file
fs.writeFileSync(routeFile, template);

console.log('✅ Successfully created API route!');
console.log(`   📁 ${routeFile}`);
console.log('\n📝 Next steps:');
console.log('   1. Update the validation schema');
console.log('   2. Implement database queries');
console.log('   3. Add authentication if needed');
console.log(`   4. Test at: http://localhost:3000/api/${routeName}\n`);
