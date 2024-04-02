package response

type Checklistresponse struct {
	Title  string `json:"title"`
	Status string `json:"status"`
}

type TaskResponse struct {
	ID        int                 `json:"id"`
	Title     string              `json:"title"`
	Checklist []Checklistresponse `json:"checklist"`
}
