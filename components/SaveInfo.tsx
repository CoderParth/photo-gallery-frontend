// import React, { useState } from "react"
// import {
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@material-ui/core"
// import { AddCircle } from "@material-ui/icons"

// interface Props {
//   onSubmit: (formData: FormData) => void
// }

// interface FormData {
//   username: string
//   description: string
//   tags: string[]
// }

// const SaveInfo: React.FC<Props> = ({ onSubmit }) => {
//   const [formData, setFormData] = useState<FormData>({
//     username: "",
//     description: "",
//     tags: [],
//   })

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSelectChange = (
//     e: React.ChangeEvent<{ name?: string; value: unknown }>
//   ) => {
//     setFormData({ ...formData, [e.target.name!]: e.target.value as string[] })
//   }

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     onSubmit(formData)
//     setFormData({ username: "", description: "", tags: [] })
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField
//         label="Username"
//         name="username"
//         value={formData.username}
//         onChange={handleInputChange}
//         required
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Description"
//         name="description"
//         value={formData.description}
//         onChange={handleInputChange}
//         required
//         fullWidth
//         margin="normal"
//         multiline
//       />
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Tags</InputLabel>
//         <Select
//           name="tags"
//           value={formData.tags}
//           onChange={handleSelectChange}
//           required
//           multiple
//         >
//           <MenuItem value="landscape">Landscape</MenuItem>
//           <MenuItem value="nature">Nature</MenuItem>
//           <MenuItem value="outdoors">Outdoors</MenuItem>
//         </Select>
//       </FormControl>
//       <Button
//         type="submit"
//         variant="contained"
//         color="primary"
//         startIcon={<AddCircle />}
//       >
//         Post Image
//       </Button>
//     </form>
//   )
// }

// export default SaveInfo
import React, { useState } from "react"
import { TextField, Button, Chip, makeStyles } from "@material-ui/core"
import { AddCircle } from "@material-ui/icons"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  tagsInput: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    alignItems: "center",
    padding: "6px 12px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "4px",
  },
  tag: {
    marginBottom: "4px",
  },
})

interface Props {
  onSubmit: (formData: FormData) => void
}

interface FormData {
  username: string
  description: string
  tags: string[]
}

const SaveInfo: React.FC<Props> = ({ onSubmit }) => {
  const classes = useStyles()
  const [formData, setFormData] = useState<FormData>({
    username: "",
    description: "",
    tags: [],
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && e.currentTarget.value.trim() !== "") {
      setFormData({
        ...formData,
        tags: [...formData.tags, e.currentTarget.value.trim()],
      })
      e.currentTarget.value = ""
    }
  }

  const handleTagDelete = (tagToDelete: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToDelete),
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ username: "", description: "", tags: [] })
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
        multiline
      />
      <Typography variant="body2" color="textSecondary" component="p">
        Enter a tag and hit space to add a tag
      </Typography>
      <div
        className={classes.tagsInput}
        onClick={() => document.getElementById("tagInput")?.focus()}
      >
        {formData.tags.map((tag) => (
          <Chip
            label={tag}
            onDelete={() => handleTagDelete(tag)}
            className={classes.tag}
            key={tag}
          />
        ))}
        <input
          id="tagInput"
          onKeyDown={handleTagInput}
          style={{ flexGrow: 1, border: "none", outline: "none" }}
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<AddCircle />}
        fullWidth
        style={{ marginTop: "16px" }}
      >
        Post Image
      </Button>
    </form>
  )
}

export default SaveInfo
