package response

type ChecklistResponse struct {
	ID     int    `json:"id"`
	TaskID int    `json:"task_id"`
	Title  string `json:"title"`
	Status string `json:"status"`
}
