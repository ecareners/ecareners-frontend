import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecareners',
  port: process.env.DB_PORT || 3306
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Helper function to get all SOPs
export const getAllSOPs = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT sop_id, title, url, category FROM sop ORDER BY sop_id ASC');
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error fetching SOPs:', error);
    throw error;
  }
};

// Helper function to get SOP by ID
export const getSOPById = async (sopId) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT sop_id, title, url, category FROM sop WHERE sop_id = ?', [sopId]);
    connection.release();
    return rows[0];
  } catch (error) {
    console.error('Error fetching SOP by ID:', error);
    throw error;
  }
};

// Helper function to create new SOP
export const createSOP = async (title, url, category = '') => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('INSERT INTO sop (title, url, category) VALUES (?, ?, ?)', [title, url, category]);
    connection.release();
    return result.insertId;
  } catch (error) {
    console.error('Error creating SOP:', error);
    throw error;
  }
};

// Helper function to update SOP
export const updateSOP = async (sopId, title, url, category = '') => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('UPDATE sop SET title = ?, url = ?, category = ? WHERE sop_id = ?', [title, url, category, sopId]);
    connection.release();
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating SOP:', error);
    throw error;
  }
};

// Helper function to delete SOP
export const deleteSOP = async (sopId) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('DELETE FROM sop WHERE sop_id = ?', [sopId]);
    connection.release();
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting SOP:', error);
    throw error;
  }
};

// Video Database Functions

// Helper function to get all videos
export const getAllVideos = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT videos_id, title, url, category FROM videos ORDER BY videos_id ASC');
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

// Helper function to get video by ID
export const getVideoById = async (videoId) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT videos_id, title, url, category FROM videos WHERE videos_id = ?', [videoId]);
    connection.release();
    return rows[0];
  } catch (error) {
    console.error('Error fetching video by ID:', error);
    throw error;
  }
};

// Helper function to create new video
export const createVideo = async (title, url, category = '') => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('INSERT INTO videos (title, url, category) VALUES (?, ?, ?)', [title, url, category]);
    connection.release();
    return result.insertId;
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
};

// Helper function to update video
export const updateVideo = async (videoId, title, url, category = '') => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('UPDATE videos SET title = ?, url = ?, category = ? WHERE videos_id = ?', [title, url, category, videoId]);
    connection.release();
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating video:', error);
    throw error;
  }
};

// Helper function to delete video
export const deleteVideo = async (videoId) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('DELETE FROM videos WHERE videos_id = ?', [videoId]);
    connection.release();
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
}; 