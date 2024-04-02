package checklist

type CreateChecklistRequest struct {
	Title  string `json:"title" binding:"required"`
	Status string `json:"status" binding:"required"`
	TaskID int    `json:"task_id" binding:"required"`
}
