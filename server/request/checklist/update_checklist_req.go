package checklist

type UpdateChecklistRequest struct {
	Title  string `json:"title"`
	Status string `json:"status"`
	TaskID int    `json:"task_id"`
}
