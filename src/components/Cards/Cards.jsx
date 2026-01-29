import React, { useState, useEffect } from "react";
import "./Cards.css";
import { getImageUrl } from "../../utils";
import api from "../../api/api";

const API = "https://secondbrain-be-bl9z.onrender.com/api/cards";


export const Cards = () => {
  const [formdata, setFormdata] = useState({
    platform: "YouTube",
    title: "",
    url: "",
    notes: "",
    tags: ""
  });

  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All");

  const platforms = [
    { name: "YouTube", icon: getImageUrl("Cards/youtube.png") },
    { name: "X", icon: getImageUrl("Cards/x.png") },
    { name: "Instagram", icon: getImageUrl("Cards/instagram.png") },
    { name: "Threads", icon: getImageUrl("Cards/threads.png") },
    { name: "Linkedin", icon: getImageUrl("Cards/linkedin.png") },
    { name: "Coupons", icon: getImageUrl("Cards/coupons.png") },
    { name: "Others", icon: getImageUrl("Cards/others.png") }
  ];

  useEffect(() => {
  api.get(API, { withCredentials: true })
    .then(res => setCards(res.data))
    .catch(err => {
      console.error('GET error:', err.message);
      console.error('Details:', err.response?.data || err);
    });
}, []);


  useEffect(() => {
    if (showForm) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCard = () => {
    if (formdata.title) {
      const timestamp = new Date().toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      });

      const newCard = { ...formdata, timestamp, isEdited: false };

      axios.post(API, newCard, { withCredentials: true })
        .then(res => {
          setCards(prev => [...prev, res.data]);
          setFormdata({ platform: "YouTube", title: "", url: "", notes: "", tags: "" });
          setShowForm(false);
        })
        .catch(err => console.error(err));
    } else {
      alert("Title is required");
    }
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditData({ ...cards[index] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    if (!editData.title) return alert("Title is required");

    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });

    const updatedCard = { ...editData, timestamp, isEdited: true };

    axios.put(`${API}/${updatedCard._id}`, updatedCard, { withCredentials: true })
      .then(res => {
        const updatedList = [...cards];
        updatedList[editIndex] = res.data;
        setCards(updatedList);
        setEditIndex(null);
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (index) => {
    const cardToDelete = cards[index];
    axios.delete(`${API}/${cardToDelete._id}`, { withCredentials: true })
      .then(() => {
        setCards(cards.filter((_, i) => i !== index));
      })
      .catch(err => console.error(err));
  };

const handleCopy = (card) => {
  if (!card.url) {
    alert("No URL available to copy!");
    return;
  }

  navigator.clipboard
    .writeText(card.url)
    .then(() => alert("URL copied to clipboard!"))
    .catch(err => {
      console.error("Copy failed:", err);
      alert("Failed to copy URL");
    });
};

  const filteredCards = cards.filter((card) => {
    const matchSearch = (
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.tags.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchPlatform =
      platformFilter === "All" || card.platform === platformFilter;

    return matchSearch && matchPlatform;
  });

  return (
    <>
      <div className="search-filter-container">
        <input
          type="text"
          name="search"
          className="ser"
          placeholder="Search cards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          name="platformFilter"
          className="filter-dropdown"
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
        >
          <option value="All">All Platforms</option>
          {platforms.map((plat, idx) => (
            <option key={idx} value={plat.name}>{plat.name}</option>
          ))}
        </select>
      </div>

      {!showForm && (
        <div className="add-btn-container">
          <button onClick={() => setShowForm(true)} className="add-btn">➕ Add New Card</button>
        </div>
      )}

      {showForm && (
        <div className="overlay">
          <div className="form-popup">
            <button className="close-btn" onClick={() => setShowForm(false)}>✖</button>

            <label className="lab">Select Platform</label>
            <select name="platform" className="inp" value={formdata.platform} onChange={handleChange}>
              {platforms.map((plat, idx) => (
                <option key={idx} value={plat.name}>{plat.name}</option>
              ))}
            </select>

            <label className="lab">Title</label>
            <input type="text" name="title" className="inp" placeholder="Enter title" value={formdata.title} onChange={handleChange} />

            <label className="lab">URL</label>
            <input type="text" name="url" className="inp" placeholder="Enter URL" value={formdata.url} onChange={handleChange} />

            <label className="lab">Notes</label>
            <input type="text" name="notes" className="inp" placeholder="Enter notes" value={formdata.notes} onChange={handleChange} />

            <label className="lab">Tags</label>
            <input type="text" name="tags" className="inp" placeholder="Enter tags" value={formdata.tags} onChange={handleChange} />

            <button onClick={handleAddCard} className="btn">Create Card</button>
          </div>
        </div>
      )}

      <div className="card-list">
        {filteredCards.map((card, index) => (
          <div key={card._id || index} className="card">
            {editIndex === index ? (
              <>
                {["title", "url", "notes", "tags"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    value={editData[field]}
                    placeholder={field}
                    onChange={handleEditChange}
                    className="inp"
                  />
                ))}
                <button onClick={handleSaveEdit} className="btn">Save</button>
              </>
            ) : (
              <>
                <div className="header-row">
                  <img src={getImageUrl(`Cards/${card.platform.toLowerCase()}.png`)} alt="platform" className="platform-icon" />
                  <h3 className="title">{card.title}</h3>
                </div>
                {card.url && <p><strong>URL:</strong> {card.url}</p>}
                {card.notes && <p><strong>Notes:</strong> {card.notes}</p>}
                {card.tags && <p><strong>Tags:</strong> {card.tags}</p>}
                <p className="timestamp">
                  {card.isEdited ? "Edited on: " : "Created on: "}
                  {card.timestamp}
                </p>
                <div className="edit-btn-wrapper">
                  <button onClick={() => handleEditClick(index)} className="edit-btn">
                    <img src={getImageUrl("Cards/edit.png")} alt="Edit" />
                  </button>
                  <button onClick={() => handleDelete(index)} className="delete-btn">
                    <img src={getImageUrl("Cards/delete.png")} alt="Delete" />
                  </button>
                  <button onClick={() => handleCopy(card)} className="copy-btn">
                    <img src={getImageUrl("Cards/copy.png")} alt="Copy" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
