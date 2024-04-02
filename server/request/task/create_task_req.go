package task

type CreateTaskRequest struct {
	Title    string `json:"title" binding:"required"`
	Status   string `json:"status" binding:"required"`
	Deadline string `json:"deadline" binding:"required"`
}
