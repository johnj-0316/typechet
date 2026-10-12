import { TrackerWithPatternRows } from '../controllers/Tracker/trackers.types';
import { TrackerWithOwnerPatternRows } from '../services/trackerServices';

export function handlePatternRows(
    tracker: TrackerWithOwnerPatternRows
): TrackerWithPatternRows {
    const { owners, ...trackerData } = tracker;

    return {
        ...trackerData,
        rows: owners.patterns.rows,
        title: owners.patterns.title
    };
}
