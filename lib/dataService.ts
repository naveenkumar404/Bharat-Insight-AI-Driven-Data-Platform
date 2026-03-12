// Data handling utilities for Bharat Insight
export interface DataRecord {
  id: number;
  state: string;
  year: number;
  value: number;
  category: string;
  status: string;
  department: string;
}

// CSV parser - handles basic CSV format
export function parseCSV(csvText: string): any[] {
  const rows = csvText.trim().split('\n');
  const headers = rows[0].split(',').map(h => h.trim());
  
  return rows.slice(1).map((row, idx) => {
    const values = row.split(',');
    const obj: any = { id: idx + 1 };
    
    headers.forEach((header, i) => {
      obj[header] = values[i]?.trim() || '';
    });
    
    return obj;
  });
}

// Transform raw CSV data to our internal format
export function transformToDataRecords(rawData: any[], dept: string): DataRecord[] {
  const indianStates = ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal", "Madhya Pradesh"];
  const statusTypes = ["Active", "Pending", "Completed"];
  
  return rawData.map((row, idx) => ({
    id: idx + 1,
    state: row.State || row.state || indianStates[idx % indianStates.length],
    year: parseInt(row.Year || row.year || String(2020 + (idx % 5))),
    value: parseInt(row.Value || row.value || String(Math.floor(Math.random() * 10000))),
    category: dept === "health" ? "Healthcare" : "Agriculture",
    status: row.Status || statusTypes[idx % 3],
    department: dept,
  }));
}

// Generate mock dataset - used as fallback
export function generateLargeDataset(rowCount: number, dept: string): DataRecord[] {
  const indianStates = ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal", "Madhya Pradesh", "Delhi", "Punjab", "Haryana", "Bihar"];
  const statusTypes = ["Active", "Pending", "Completed"];
  
  const records: DataRecord[] = [];
  
  for (let i = 0; i < rowCount; i++) {
    records.push({
      id: i + 1,
      state: indianStates[i % indianStates.length],
      year: 2018 + (i % 7),
      value: Math.floor(Math.random() * 50000) + 1000,
      category: dept === "health" ? "Healthcare" : "Agriculture",
      status: statusTypes[i % 3],
      department: dept,
    });
  }
  
  return records;
}

// Main data fetching function
export async function fetchDataset(dept: string): Promise<DataRecord[]> {
  try {
    // TODO: Replace with actual data.gov.in API call
    // For now, using generated data
    return generateLargeDataset(100000, dept);
  } catch (err) {
    console.error('Error fetching data:', err);
    return generateLargeDataset(100000, dept);
  }
}
