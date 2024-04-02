package task

type CreateTaskRequest struct {
	Title    string `form:"title" binding:"required"`
	Status   string `form:"status" binding:"required"`
	Deadline string `form:"deadline" binding:"required"`
}
