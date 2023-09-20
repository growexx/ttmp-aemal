import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface contextProps {
  params: {
    taskId: number;
  };
}

export async function DELETE(req: Request, context: contextProps) {
  try {
    const { params } = context;
    await db.task.delete({ where: { id: Number(params.taskId) } });
    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not delete task" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context: contextProps) {
  try {
    const { params } = context;
    const body = await req.json();
    const task = await db.task.update({
      where: { id: Number(params.taskId) },
      data: body,
    });
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not update task" },
      { status: 500 }
    );
  }
}

export const GET = async (req: Request, context: contextProps) => {
  try {
    const { params } = context;
    const task = await db.task.findUnique({
      where: { id: Number(params.taskId) },
    });
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not find task" },
      { status: 500 }
    );
  }
};
